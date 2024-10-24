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
import { getRoomData } from "./graphql/queries";
import { updateRoomData } from "./graphql/mutations";
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
export default function RoomDataUpdateForm(props) {
  const {
    id: idProp,
    roomData: roomDataModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    type: "",
    template: "",
    templateName: "",
    thumbnail: "",
    videos: [],
  };
  const [type, setType] = React.useState(initialValues.type);
  const [template, setTemplate] = React.useState(initialValues.template);
  const [templateName, setTemplateName] = React.useState(
    initialValues.templateName
  );
  const [thumbnail, setThumbnail] = React.useState(initialValues.thumbnail);
  const [videos, setVideos] = React.useState(initialValues.videos);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = roomDataRecord
      ? { ...initialValues, ...roomDataRecord }
      : initialValues;
    setType(cleanValues.type);
    setTemplate(cleanValues.template);
    setTemplateName(cleanValues.templateName);
    setThumbnail(cleanValues.thumbnail);
    setVideos(cleanValues.videos ?? []);
    setCurrentVideosValue("");
    setErrors({});
  };
  const [roomDataRecord, setRoomDataRecord] = React.useState(roomDataModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getRoomData.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getRoomData
        : roomDataModelProp;
      setRoomDataRecord(record);
    };
    queryData();
  }, [idProp, roomDataModelProp]);
  React.useEffect(resetStateValues, [roomDataRecord]);
  const [currentVideosValue, setCurrentVideosValue] = React.useState("");
  const videosRef = React.createRef();
  const validations = {
    type: [],
    template: [],
    templateName: [],
    thumbnail: [],
    videos: [],
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
          type: type ?? null,
          template: template ?? null,
          templateName: templateName ?? null,
          thumbnail: thumbnail ?? null,
          videos: videos ?? null,
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
            query: updateRoomData.replaceAll("__typename", ""),
            variables: {
              input: {
                id: roomDataRecord.id,
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
      {...getOverrideProps(overrides, "RoomDataUpdateForm")}
      {...rest}
    >
      <SelectField
        label="Type"
        placeholder="Please select an option"
        isDisabled={false}
        value={type}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              type: value,
              template,
              templateName,
              thumbnail,
              videos,
            };
            const result = onChange(modelFields);
            value = result?.type ?? value;
          }
          if (errors.type?.hasError) {
            runValidationTasks("type", value);
          }
          setType(value);
        }}
        onBlur={() => runValidationTasks("type", type)}
        errorMessage={errors.type?.errorMessage}
        hasError={errors.type?.hasError}
        {...getOverrideProps(overrides, "type")}
      >
        <option
          children="Room"
          value="Room"
          {...getOverrideProps(overrides, "typeoption0")}
        ></option>
        <option
          children="Demo"
          value="Demo"
          {...getOverrideProps(overrides, "typeoption1")}
        ></option>
        <option
          children="Item"
          value="Item"
          {...getOverrideProps(overrides, "typeoption2")}
        ></option>
      </SelectField>
      <TextField
        label="Template"
        isRequired={false}
        isReadOnly={false}
        value={template}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              type,
              template: value,
              templateName,
              thumbnail,
              videos,
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
      ></TextField>
      <TextField
        label="Template name"
        isRequired={false}
        isReadOnly={false}
        value={templateName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              type,
              template,
              templateName: value,
              thumbnail,
              videos,
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
              type,
              template,
              templateName,
              thumbnail: value,
              videos,
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
              type,
              template,
              templateName,
              thumbnail,
              videos: values,
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
          isDisabled={!(idProp || roomDataModelProp)}
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
              !(idProp || roomDataModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
