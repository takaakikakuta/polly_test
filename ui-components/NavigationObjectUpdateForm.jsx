/* eslint-disable */
"use client";
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getNavigationObject } from "./graphql/queries";
import { updateNavigationObject } from "./graphql/mutations";
const client = generateClient();
export default function NavigationObjectUpdateForm(props) {
  const {
    id: idProp,
    navigationObject: navigationObjectModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    id: "",
    order: "",
    Navgation: "",
  };
  const [id, setId] = React.useState(initialValues.id);
  const [order, setOrder] = React.useState(initialValues.order);
  const [Navgation, setNavgation] = React.useState(initialValues.Navgation);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = navigationObjectRecord
      ? { ...initialValues, ...navigationObjectRecord }
      : initialValues;
    setId(cleanValues.id);
    setOrder(cleanValues.order);
    setNavgation(cleanValues.Navgation);
    setErrors({});
  };
  const [navigationObjectRecord, setNavigationObjectRecord] = React.useState(
    navigationObjectModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getNavigationObject.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getNavigationObject
        : navigationObjectModelProp;
      setNavigationObjectRecord(record);
    };
    queryData();
  }, [idProp, navigationObjectModelProp]);
  React.useEffect(resetStateValues, [navigationObjectRecord]);
  const validations = {
    id: [{ type: "Required" }],
    order: [],
    Navgation: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          id,
          order: order ?? null,
          Navgation: Navgation ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: updateNavigationObject.replaceAll("__typename", ""),
            variables: {
              input: {
                id: navigationObjectRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "NavigationObjectUpdateForm")}
      {...rest}
    >
      <TextField
        label="Id"
        isRequired={true}
        isReadOnly={true}
        value={id}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id: value,
              order,
              Navgation,
            };
            const result = onChange(modelFields);
            value = result?.id ?? value;
          }
          if (errors.id?.hasError) {
            runValidationTasks("id", value);
          }
          setId(value);
        }}
        onBlur={() => runValidationTasks("id", id)}
        errorMessage={errors.id?.errorMessage}
        hasError={errors.id?.hasError}
        {...getOverrideProps(overrides, "id")}
      ></TextField>
      <TextField
        label="Order"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={order}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              id,
              order: value,
              Navgation,
            };
            const result = onChange(modelFields);
            value = result?.order ?? value;
          }
          if (errors.order?.hasError) {
            runValidationTasks("order", value);
          }
          setOrder(value);
        }}
        onBlur={() => runValidationTasks("order", order)}
        errorMessage={errors.order?.errorMessage}
        hasError={errors.order?.hasError}
        {...getOverrideProps(overrides, "order")}
      ></TextField>
      <TextField
        label="Navgation"
        isRequired={false}
        isReadOnly={false}
        value={Navgation}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id,
              order,
              Navgation: value,
            };
            const result = onChange(modelFields);
            value = result?.Navgation ?? value;
          }
          if (errors.Navgation?.hasError) {
            runValidationTasks("Navgation", value);
          }
          setNavgation(value);
        }}
        onBlur={() => runValidationTasks("Navgation", Navgation)}
        errorMessage={errors.Navgation?.errorMessage}
        hasError={errors.Navgation?.hasError}
        {...getOverrideProps(overrides, "Navgation")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || navigationObjectModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || navigationObjectModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
