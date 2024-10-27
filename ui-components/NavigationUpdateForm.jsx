/* eslint-disable */
"use client";
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getNavigation } from "./graphql/queries";
import { updateNavigation } from "./graphql/mutations";
const client = generateClient();
export default function NavigationUpdateForm(props) {
  const {
    id: idProp,
    navigation: navigationModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    templateId: "",
    order: "",
    text: "",
    src: "",
  };
  const [templateId, setTemplateId] = React.useState(initialValues.templateId);
  const [order, setOrder] = React.useState(initialValues.order);
  const [text, setText] = React.useState(initialValues.text);
  const [src, setSrc] = React.useState(initialValues.src);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = navigationRecord
      ? { ...initialValues, ...navigationRecord }
      : initialValues;
    setTemplateId(cleanValues.templateId);
    setOrder(cleanValues.order);
    setText(cleanValues.text);
    setSrc(cleanValues.src);
    setErrors({});
  };
  const [navigationRecord, setNavigationRecord] =
    React.useState(navigationModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getNavigation.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getNavigation
        : navigationModelProp;
      setNavigationRecord(record);
    };
    queryData();
  }, [idProp, navigationModelProp]);
  React.useEffect(resetStateValues, [navigationRecord]);
  const validations = {
    templateId: [],
    order: [],
    text: [],
    src: [],
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
          templateId: templateId ?? null,
          order: order ?? null,
          text: text ?? null,
          src: src ?? null,
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
            query: updateNavigation.replaceAll("__typename", ""),
            variables: {
              input: {
                id: navigationRecord.id,
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
      {...getOverrideProps(overrides, "NavigationUpdateForm")}
      {...rest}
    >
      <TextField
        label="Template id"
        isRequired={false}
        isReadOnly={false}
        value={templateId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              templateId: value,
              order,
              text,
              src,
            };
            const result = onChange(modelFields);
            value = result?.templateId ?? value;
          }
          if (errors.templateId?.hasError) {
            runValidationTasks("templateId", value);
          }
          setTemplateId(value);
        }}
        onBlur={() => runValidationTasks("templateId", templateId)}
        errorMessage={errors.templateId?.errorMessage}
        hasError={errors.templateId?.hasError}
        {...getOverrideProps(overrides, "templateId")}
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
              templateId,
              order: value,
              text,
              src,
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
        label="Text"
        isRequired={false}
        isReadOnly={false}
        value={text}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              templateId,
              order,
              text: value,
              src,
            };
            const result = onChange(modelFields);
            value = result?.text ?? value;
          }
          if (errors.text?.hasError) {
            runValidationTasks("text", value);
          }
          setText(value);
        }}
        onBlur={() => runValidationTasks("text", text)}
        errorMessage={errors.text?.errorMessage}
        hasError={errors.text?.hasError}
        {...getOverrideProps(overrides, "text")}
      ></TextField>
      <TextField
        label="Src"
        isRequired={false}
        isReadOnly={false}
        value={src}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              templateId,
              order,
              text,
              src: value,
            };
            const result = onChange(modelFields);
            value = result?.src ?? value;
          }
          if (errors.src?.hasError) {
            runValidationTasks("src", value);
          }
          setSrc(value);
        }}
        onBlur={() => runValidationTasks("src", src)}
        errorMessage={errors.src?.errorMessage}
        hasError={errors.src?.hasError}
        {...getOverrideProps(overrides, "src")}
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
          isDisabled={!(idProp || navigationModelProp)}
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
              !(idProp || navigationModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
