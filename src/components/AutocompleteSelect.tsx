import React, { useMemo, useRef, useState } from "react";
import { Select, Spin, Button, Modal } from "antd";
import debounce from "lodash/debounce";
import type { SelectProps } from "antd/es/select";
import { axiosInstance } from "../config/axios";

export interface DebounceSelectProps<ValueType = any>
  extends Omit<SelectProps<ValueType | ValueType[]>, "options" | "children"> {
  fetchOptions: (search: string) => Promise<ValueType[]>;
  debounceTimeout?: number;
}

function DebounceSelect<
  ValueType extends {
    key?: string;
    label: React.ReactNode;
    value: string | number;
  } = any
>({
  fetchOptions,
  debounceTimeout = 800,
  ...props
}: DebounceSelectProps<ValueType>) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState<ValueType[]>([]);
  const fetchRef = useRef(0);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);

      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }

        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);

  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      options={options}
    />
  );
}

// Usage of DebounceSelect
interface UserValue {
  label: string;
  value: string;
}

async function fetchUserList(username: string): Promise<UserValue[]> {
  return axiosInstance
    .get(`search-users?event_id=19&search=${username}`)
    .then((response) =>
      response.data.users.map((user: any) => ({
        label: `${user.first_name} ${user.last_name}`,
        value: user.id,
      }))
    );
}

const AutocompleteSelect = ({ onChange }: any) => {
  const [value, setValue] = useState<UserValue[]>([]);

  const handleChange = (newValue: UserValue[]) => {
    setValue(newValue as UserValue[]);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <DebounceSelect
      mode="multiple"
      value={value}
      placeholder="Select users"
      fetchOptions={fetchUserList}
      onChange={(newValue) => {
        handleChange(newValue as UserValue[]);
      }}
      style={{ width: "100%" }}
    />
  );
};

export default AutocompleteSelect;
