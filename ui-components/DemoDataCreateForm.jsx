/* eslint-disable */
"use client";
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  SelectField,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createDemoData } from "./graphql/mutations";
const client = generateClient();
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  runValidationTasks,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    const { hasError } = runValidationTasks();
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function DemoDataCreateForm(props) {
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
    template: "",
    templateName: "",
    thumbnail: "",
    videos: [],
    Navigations: [],
  };
  const [template, setTemplate] = React.useState(initialValues.template);
  const [templateName, setTemplateName] = React.useState(
    initialValues.templateName
  );
  const [thumbnail, setThumbnail] = React.useState(initialValues.thumbnail);
  const [videos, setVideos] = React.useState(initialValues.videos);
  const [Navigations, setNavigations] = React.useState(
    initialValues.Navigations
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setTemplate(initialValues.template);
    setTemplateName(initialValues.templateName);
    setThumbnail(initialValues.thumbnail);
    setVideos(initialValues.videos);
    setCurrentVideosValue("");
    setNavigations(initialValues.Navigations);
    setCurrentNavigationsValue("");
    setErrors({});
  };
  const [currentVideosValue, setCurrentVideosValue] = React.useState("");
  const videosRef = React.createRef();
  const [currentNavigationsValue, setCurrentNavigationsValue] =
    React.useState("");
  const NavigationsRef = React.createRef();
  const validations = {
    template: [],
    templateName: [],
    thumbnail: [],
    videos: [],
    Navigations: [],
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
          template,
          templateName,
          thumbnail,
          videos,
          Navigations,
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
            query: createDemoData.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "DemoDataCreateForm")}
      {...rest}
    >
      <SelectField
        label="Template"
        placeholder="Please select an option"
        isDisabled={false}
        value={template}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              template: value,
              templateName,
              thumbnail,
              videos,
              Navigations,
            };
            const result = onChange(modelFields);
            value = result?.template ?? value;
          }
          if (errors.template?.hasError) {
            runValidationTasks("template", value);
          }
          setTemplate(value);
        }}
        onBlur={() => runValidationTasks("template", template)}
        errorMessage={errors.template?.errorMessage}
        hasError={errors.template?.hasError}
        {...getOverrideProps(overrides, "template")}
      >
        <option
          children="Threesixo view"
          value="ThreesixoView"
          {...getOverrideProps(overrides, "templateoption0")}
        ></option>
        <option
          children="Map view"
          value="MapView"
          {...getOverrideProps(overrides, "templateoption1")}
        ></option>
        <option
          children="Map video view"
          value="MapVideoView"
          {...getOverrideProps(overrides, "templateoption2")}
        ></option>
        <option
          children="Mono view"
          value="MonoView"
          {...getOverrideProps(overrides, "templateoption3")}
        ></option>
        <option
          children="Multi angle view"
          value="MultiAngleView"
          {...getOverrideProps(overrides, "templateoption4")}
        ></option>
        <option
          children="Path view"
          value="PathView"
          {...getOverrideProps(overrides, "templateoption5")}
        ></option>
        <option
          children="Sync view"
          value="SyncView"
          {...getOverrideProps(overrides, "templateoption6")}
        ></option>
      </SelectField>
      <TextField
        label="Template name"
        isRequired={false}
        isReadOnly={false}
        value={templateName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              template,
              templateName: value,
              thumbnail,
              videos,
              Navigations,
            };
            const result = onChange(modelFields);
            value = result?.templateName ?? value;
          }
          if (errors.templateName?.hasError) {
            runValidationTasks("templateName", value);
          }
          setTemplateName(value);
        }}
        onBlur={() => runValidationTasks("templateName", templateName)}
        errorMessage={errors.templateName?.errorMessage}
        hasError={errors.templateName?.hasError}
        {...getOverrideProps(overrides, "templateName")}
      ></TextField>
      <TextField
        label="Thumbnail"
        isRequired={false}
        isReadOnly={false}
        value={thumbnail}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              template,
              templateName,
              thumbnail: value,
              videos,
              Navigations,
            };
            const result = onChange(modelFields);
            value = result?.thumbnail ?? value;
          }
          if (errors.thumbnail?.hasError) {
            runValidationTasks("thumbnail", value);
          }
          setThumbnail(value);
        }}
        onBlur={() => runValidationTasks("thumbnail", thumbnail)}
        errorMessage={errors.thumbnail?.errorMessage}
        hasError={errors.thumbnail?.hasError}
        {...getOverrideProps(overrides, "thumbnail")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              template,
              templateName,
              thumbnail,
              videos: values,
              Navigations,
            };
            const result = onChange(modelFields);
            values = result?.videos ?? values;
          }
          setVideos(values);
          setCurrentVideosValue("");
        }}
        currentFieldValue={currentVideosValue}
        label={"Videos"}
        items={videos}
        hasError={errors?.videos?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("videos", currentVideosValue)
        }
        errorMessage={errors?.videos?.errorMessage}
        setFieldValue={setCurrentVideosValue}
        inputFieldRef={videosRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Videos"
          isRequired={false}
          isReadOnly={false}
          value={currentVideosValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.videos?.hasError) {
              runValidationTasks("videos", value);
            }
            setCurrentVideosValue(value);
          }}
          onBlur={() => runValidationTasks("videos", currentVideosValue)}
          errorMessage={errors.videos?.errorMessage}
          hasError={errors.videos?.hasError}
          ref={videosRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "videos")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              template,
              templateName,
              thumbnail,
              videos,
              Navigations: values,
            };
            const result = onChange(modelFields);
            values = result?.Navigations ?? values;
          }
          setNavigations(values);
          setCurrentNavigationsValue("");
        }}
        currentFieldValue={currentNavigationsValue}
        label={"Navigations"}
        items={Navigations}
        hasError={errors?.Navigations?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("Navigations", currentNavigationsValue)
        }
        errorMessage={errors?.Navigations?.errorMessage}
        setFieldValue={setCurrentNavigationsValue}
        inputFieldRef={NavigationsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Navigations"
          isRequired={false}
          isReadOnly={false}
          value={currentNavigationsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.Navigations?.hasError) {
              runValidationTasks("Navigations", value);
            }
            setCurrentNavigationsValue(value);
          }}
          onBlur={() =>
            runValidationTasks("Navigations", currentNavigationsValue)
          }
          errorMessage={errors.Navigations?.errorMessage}
          hasError={errors.Navigations?.hasError}
          ref={NavigationsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "Navigations")}
        ></TextField>
      </ArrayField>
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
