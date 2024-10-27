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
import { createMapData } from "./graphql/mutations";
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
export default function MapDataCreateForm(props) {
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
    selectView: "",
    thumbnail: "",
    RoomList: [],
    DemoList: [],
    ItemList: [],
  };
  const [template, setTemplate] = React.useState(initialValues.template);
  const [templateName, setTemplateName] = React.useState(
    initialValues.templateName
  );
  const [selectView, setSelectView] = React.useState(initialValues.selectView);
  const [thumbnail, setThumbnail] = React.useState(initialValues.thumbnail);
  const [RoomList, setRoomList] = React.useState(initialValues.RoomList);
  const [DemoList, setDemoList] = React.useState(initialValues.DemoList);
  const [ItemList, setItemList] = React.useState(initialValues.ItemList);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setTemplate(initialValues.template);
    setTemplateName(initialValues.templateName);
    setSelectView(initialValues.selectView);
    setThumbnail(initialValues.thumbnail);
    setRoomList(initialValues.RoomList);
    setCurrentRoomListValue("");
    setDemoList(initialValues.DemoList);
    setCurrentDemoListValue("");
    setItemList(initialValues.ItemList);
    setCurrentItemListValue("");
    setErrors({});
  };
  const [currentRoomListValue, setCurrentRoomListValue] = React.useState("");
  const RoomListRef = React.createRef();
  const [currentDemoListValue, setCurrentDemoListValue] = React.useState("");
  const DemoListRef = React.createRef();
  const [currentItemListValue, setCurrentItemListValue] = React.useState("");
  const ItemListRef = React.createRef();
  const validations = {
    template: [],
    templateName: [],
    selectView: [],
    thumbnail: [],
    RoomList: [],
    DemoList: [],
    ItemList: [],
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
          selectView,
          thumbnail,
          RoomList,
          DemoList,
          ItemList,
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
            query: createMapData.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "MapDataCreateForm")}
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
              selectView,
              thumbnail,
              RoomList,
              DemoList,
              ItemList,
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
              selectView,
              thumbnail,
              RoomList,
              DemoList,
              ItemList,
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
      <SelectField
        label="Select view"
        placeholder="Please select an option"
        isDisabled={false}
        value={selectView}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              template,
              templateName,
              selectView: value,
              thumbnail,
              RoomList,
              DemoList,
              ItemList,
            };
            const result = onChange(modelFields);
            value = result?.selectView ?? value;
          }
          if (errors.selectView?.hasError) {
            runValidationTasks("selectView", value);
          }
          setSelectView(value);
        }}
        onBlur={() => runValidationTasks("selectView", selectView)}
        errorMessage={errors.selectView?.errorMessage}
        hasError={errors.selectView?.hasError}
        {...getOverrideProps(overrides, "selectView")}
      >
        <option
          children="Threesixo view"
          value="ThreesixoView"
          {...getOverrideProps(overrides, "selectViewoption0")}
        ></option>
        <option
          children="Map view"
          value="MapView"
          {...getOverrideProps(overrides, "selectViewoption1")}
        ></option>
        <option
          children="Map video view"
          value="MapVideoView"
          {...getOverrideProps(overrides, "selectViewoption2")}
        ></option>
        <option
          children="Mono view"
          value="MonoView"
          {...getOverrideProps(overrides, "selectViewoption3")}
        ></option>
        <option
          children="Multi angle view"
          value="MultiAngleView"
          {...getOverrideProps(overrides, "selectViewoption4")}
        ></option>
        <option
          children="Path view"
          value="PathView"
          {...getOverrideProps(overrides, "selectViewoption5")}
        ></option>
        <option
          children="Sync view"
          value="SyncView"
          {...getOverrideProps(overrides, "selectViewoption6")}
        ></option>
      </SelectField>
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
              selectView,
              thumbnail: value,
              RoomList,
              DemoList,
              ItemList,
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
              selectView,
              thumbnail,
              RoomList: values,
              DemoList,
              ItemList,
            };
            const result = onChange(modelFields);
            values = result?.RoomList ?? values;
          }
          setRoomList(values);
          setCurrentRoomListValue("");
        }}
        currentFieldValue={currentRoomListValue}
        label={"Room list"}
        items={RoomList}
        hasError={errors?.RoomList?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("RoomList", currentRoomListValue)
        }
        errorMessage={errors?.RoomList?.errorMessage}
        setFieldValue={setCurrentRoomListValue}
        inputFieldRef={RoomListRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Room list"
          isRequired={false}
          isReadOnly={false}
          value={currentRoomListValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.RoomList?.hasError) {
              runValidationTasks("RoomList", value);
            }
            setCurrentRoomListValue(value);
          }}
          onBlur={() => runValidationTasks("RoomList", currentRoomListValue)}
          errorMessage={errors.RoomList?.errorMessage}
          hasError={errors.RoomList?.hasError}
          ref={RoomListRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "RoomList")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              template,
              templateName,
              selectView,
              thumbnail,
              RoomList,
              DemoList: values,
              ItemList,
            };
            const result = onChange(modelFields);
            values = result?.DemoList ?? values;
          }
          setDemoList(values);
          setCurrentDemoListValue("");
        }}
        currentFieldValue={currentDemoListValue}
        label={"Demo list"}
        items={DemoList}
        hasError={errors?.DemoList?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("DemoList", currentDemoListValue)
        }
        errorMessage={errors?.DemoList?.errorMessage}
        setFieldValue={setCurrentDemoListValue}
        inputFieldRef={DemoListRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Demo list"
          isRequired={false}
          isReadOnly={false}
          value={currentDemoListValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.DemoList?.hasError) {
              runValidationTasks("DemoList", value);
            }
            setCurrentDemoListValue(value);
          }}
          onBlur={() => runValidationTasks("DemoList", currentDemoListValue)}
          errorMessage={errors.DemoList?.errorMessage}
          hasError={errors.DemoList?.hasError}
          ref={DemoListRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "DemoList")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              template,
              templateName,
              selectView,
              thumbnail,
              RoomList,
              DemoList,
              ItemList: values,
            };
            const result = onChange(modelFields);
            values = result?.ItemList ?? values;
          }
          setItemList(values);
          setCurrentItemListValue("");
        }}
        currentFieldValue={currentItemListValue}
        label={"Item list"}
        items={ItemList}
        hasError={errors?.ItemList?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("ItemList", currentItemListValue)
        }
        errorMessage={errors?.ItemList?.errorMessage}
        setFieldValue={setCurrentItemListValue}
        inputFieldRef={ItemListRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Item list"
          isRequired={false}
          isReadOnly={false}
          value={currentItemListValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.ItemList?.hasError) {
              runValidationTasks("ItemList", value);
            }
            setCurrentItemListValue(value);
          }}
          onBlur={() => runValidationTasks("ItemList", currentItemListValue)}
          errorMessage={errors.ItemList?.errorMessage}
          hasError={errors.ItemList?.hasError}
          ref={ItemListRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "ItemList")}
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
