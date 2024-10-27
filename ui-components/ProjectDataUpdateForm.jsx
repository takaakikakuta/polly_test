/* eslint-disable */
"use client";
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getProjectData } from "./graphql/queries";
import { updateProjectData } from "./graphql/mutations";
const client = generateClient();
export default function ProjectDataUpdateForm(props) {
  const {
    id: idProp,
    projectData: projectDataModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    projectName: "",
    templateId: "",
  };
  const [projectName, setProjectName] = React.useState(
    initialValues.projectName
  );
  const [templateId, setTemplateId] = React.useState(initialValues.templateId);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = projectDataRecord
      ? { ...initialValues, ...projectDataRecord }
      : initialValues;
    setProjectName(cleanValues.projectName);
    setTemplateId(cleanValues.templateId);
    setErrors({});
  };
  const [projectDataRecord, setProjectDataRecord] =
    React.useState(projectDataModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getProjectData.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getProjectData
        : projectDataModelProp;
      setProjectDataRecord(record);
    };
    queryData();
  }, [idProp, projectDataModelProp]);
  React.useEffect(resetStateValues, [projectDataRecord]);
  const validations = {
    projectName: [],
    templateId: [],
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
          projectName: projectName ?? null,
          templateId: templateId ?? null,
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
            query: updateProjectData.replaceAll("__typename", ""),
            variables: {
              input: {
                id: projectDataRecord.id,
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
      {...getOverrideProps(overrides, "ProjectDataUpdateForm")}
      {...rest}
    >
      <TextField
        label="Project name"
        isRequired={false}
        isReadOnly={false}
        value={projectName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              projectName: value,
              templateId,
            };
            const result = onChange(modelFields);
            value = result?.projectName ?? value;
          }
          if (errors.projectName?.hasError) {
            runValidationTasks("projectName", value);
          }
          setProjectName(value);
        }}
        onBlur={() => runValidationTasks("projectName", projectName)}
        errorMessage={errors.projectName?.errorMessage}
        hasError={errors.projectName?.hasError}
        {...getOverrideProps(overrides, "projectName")}
      ></TextField>
      <TextField
        label="Template id"
        isRequired={false}
        isReadOnly={false}
        value={templateId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              projectName,
              templateId: value,
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
          isDisabled={!(idProp || projectDataModelProp)}
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
              !(idProp || projectDataModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
