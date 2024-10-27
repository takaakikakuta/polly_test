/* eslint-disable */
"use client";
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createCameraPointData } from "./graphql/mutations";
const client = generateClient();
export default function CameraPointDataCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    slug: "",
    radian: "",
    image: "",
    cameraRadian: "",
  };
  const [slug, setSlug] = React.useState(initialValues.slug);
  const [radian, setRadian] = React.useState(initialValues.radian);
  const [image, setImage] = React.useState(initialValues.image);
  const [cameraRadian, setCameraRadian] = React.useState(
    initialValues.cameraRadian
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setSlug(initialValues.slug);
    setRadian(initialValues.radian);
    setImage(initialValues.image);
    setCameraRadian(initialValues.cameraRadian);
    setErrors({});
  };
  const validations = {
    slug: [],
    radian: [],
    image: [],
    cameraRadian: [],
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
          slug,
          radian,
          image,
          cameraRadian,
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
            query: createCameraPointData.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "CameraPointDataCreateForm")}
      {...rest}
    >
      <TextField
        label="Slug"
        isRequired={false}
        isReadOnly={false}
        value={slug}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              slug: value,
              radian,
              image,
              cameraRadian,
            };
            const result = onChange(modelFields);
            value = result?.slug ?? value;
          }
          if (errors.slug?.hasError) {
            runValidationTasks("slug", value);
          }
          setSlug(value);
        }}
        onBlur={() => runValidationTasks("slug", slug)}
        errorMessage={errors.slug?.errorMessage}
        hasError={errors.slug?.hasError}
        {...getOverrideProps(overrides, "slug")}
      ></TextField>
      <TextField
        label="Radian"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={radian}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              slug,
              radian: value,
              image,
              cameraRadian,
            };
            const result = onChange(modelFields);
            value = result?.radian ?? value;
          }
          if (errors.radian?.hasError) {
            runValidationTasks("radian", value);
          }
          setRadian(value);
        }}
        onBlur={() => runValidationTasks("radian", radian)}
        errorMessage={errors.radian?.errorMessage}
        hasError={errors.radian?.hasError}
        {...getOverrideProps(overrides, "radian")}
      ></TextField>
      <TextField
        label="Image"
        isRequired={false}
        isReadOnly={false}
        value={image}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              slug,
              radian,
              image: value,
              cameraRadian,
            };
            const result = onChange(modelFields);
            value = result?.image ?? value;
          }
          if (errors.image?.hasError) {
            runValidationTasks("image", value);
          }
          setImage(value);
        }}
        onBlur={() => runValidationTasks("image", image)}
        errorMessage={errors.image?.errorMessage}
        hasError={errors.image?.hasError}
        {...getOverrideProps(overrides, "image")}
      ></TextField>
      <TextField
        label="Camera radian"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={cameraRadian}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              slug,
              radian,
              image,
              cameraRadian: value,
            };
            const result = onChange(modelFields);
            value = result?.cameraRadian ?? value;
          }
          if (errors.cameraRadian?.hasError) {
            runValidationTasks("cameraRadian", value);
          }
          setCameraRadian(value);
        }}
        onBlur={() => runValidationTasks("cameraRadian", cameraRadian)}
        errorMessage={errors.cameraRadian?.errorMessage}
        hasError={errors.cameraRadian?.hasError}
        {...getOverrideProps(overrides, "cameraRadian")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
