import React from "react";

import Address from "@/components/Address/Address";
import AddressBook from "@/components/AddressBook/AddressBook";
import Button from "@/components/Button/Button";
import Radio from "@/components/Radio/Radio";
import Section from "@/components/Section/Section";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage"
import Form from "@/components/Form/Form";
import useAddressBook from "@/hooks/useAddressBook";
import useFormFields from "@/hooks/useFormFields";
import transformAddress, { RawAddressModel } from './core/models/address'

import { Address as AddressType } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_URL;

function App() {
  const { fields, onChange, clearFields: clearFormFields } = useFormFields({
    postCode: "",
    houseNumber: "",
    firstName: "",
    lastName: "",
    selectedAddress: "",
  });

  const { postCode, houseNumber, firstName, lastName, selectedAddress } = fields;

  /**
   * Results states
   */
  const [error, setError] = React.useState<undefined | string>(undefined);
  const [addresses, setAddresses] = React.useState<AddressType[]>([]);
  const [loading, setLoading] = React.useState(false);
  /**
   * Redux actions
   */
  const { addAddress } = useAddressBook();

  const handleAddressSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    setAddresses([]);
    setError(undefined);
    setLoading(true);

    try {
      const url = `${BASE_URL}/api/getAddresses?postcode=${postCode}&streetnumber=${houseNumber}`;

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        setError(data.errormessage || "Something went wrong");
        return;
      }

      setAddresses(
        data.details.map((address: RawAddressModel) => transformAddress(address))
      );

    } catch (err) {
      setError("Something went wrong while fetching addresses");
    } finally {
      setLoading(false);
    }
  };

  const handlePersonSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!firstName.trim() || !lastName.trim()) {
      setError("First name and last name fields mandatory!");
      return;
    }

    if (!selectedAddress || !addresses.length) {
      setError(
        "No address selected, try to select an address or find one if you haven't"
      );
      return;
    }

    const foundAddress = addresses.find(
      (address) => address.id === selectedAddress
    );

    if (!foundAddress) {
      setError("Selected address not found");
      return;
    }

    setError(undefined);
    addAddress({ ...foundAddress, firstName, lastName });
  };

  const handleClearAllFields = () => {
    clearFormFields();
    setAddresses([]);
    setError(undefined);
  };

  const addressFormEntries = [
    {
      name: 'postCode',
      placeholder: 'Post Code',
      extraProps: {
        onChange: onChange,
        value: postCode
      }
    },
    {
      name: 'houseNumber',
      placeholder: 'House number',
      extraProps: {
        onChange: onChange,
        value: houseNumber
      }
    }
  ];

  const personalInfoFormEntries = [
    {
      name: 'firstName',
      placeholder: 'First name',
      extraProps: {
        onChange: onChange,
        value: firstName,
      },
    },
    {
      name: 'lastName',
      placeholder: 'Last name',
      extraProps: {
        onChange: onChange,
        value: lastName,
      },
    },
  ];

  return (
    <main>
      <Section>
        <h1>
          Create your own address book!
          <br />
          <small>
            Enter an address by postcode add personal info and done! 👏
          </small>
        </h1>
        <Form
          label="🏠 Find an address"
          onFormSubmit={(event) => void handleAddressSubmit(event)}
          submitText="Find"
          formEntries={addressFormEntries}
          loading={loading}
        />
        {addresses.length > 0 &&
          addresses.map((address) => {
            return (
              <Radio
                name="selectedAddress"
                id={address.id}
                key={address.id}
                onChange={onChange}
                checked={selectedAddress === address.id}
              >
                <Address {...address} />
              </Radio>
            );
          })}
        {selectedAddress && (
          <Form
            label="✏️ Add personal info to address"
            onFormSubmit={(event) => void handlePersonSubmit(event)}
            submitText="Add to addressbook"
            formEntries={personalInfoFormEntries}
          />
        )}

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Button variant="secondary" onClick={handleClearAllFields}>
          Clear all fields
        </Button>

      </Section>

      <Section variant="dark">
        <AddressBook />
      </Section>
    </main>
  );
}

export default App;
