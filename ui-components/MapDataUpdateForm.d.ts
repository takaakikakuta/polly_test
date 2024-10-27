import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { MapData } from "./graphql/types";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type MapDataUpdateFormInputValues = {
    template?: string;
    templateName?: string;
    selectView?: string;
    thumbnail?: string;
    RoomList?: string[];
    DemoList?: string[];
    ItemList?: string[];
};
export declare type MapDataUpdateFormValidationValues = {
    template?: ValidationFunction<string>;
    templateName?: ValidationFunction<string>;
    selectView?: ValidationFunction<string>;
    thumbnail?: ValidationFunction<string>;
    RoomList?: ValidationFunction<string>;
    DemoList?: ValidationFunction<string>;
    ItemList?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MapDataUpdateFormOverridesProps = {
    MapDataUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    template?: PrimitiveOverrideProps<SelectFieldProps>;
    templateName?: PrimitiveOverrideProps<TextFieldProps>;
    selectView?: PrimitiveOverrideProps<SelectFieldProps>;
    thumbnail?: PrimitiveOverrideProps<TextFieldProps>;
    RoomList?: PrimitiveOverrideProps<TextFieldProps>;
    DemoList?: PrimitiveOverrideProps<TextFieldProps>;
    ItemList?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type MapDataUpdateFormProps = React.PropsWithChildren<{
    overrides?: MapDataUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    mapData?: MapData;
    onSubmit?: (fields: MapDataUpdateFormInputValues) => MapDataUpdateFormInputValues;
    onSuccess?: (fields: MapDataUpdateFormInputValues) => void;
    onError?: (fields: MapDataUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MapDataUpdateFormInputValues) => MapDataUpdateFormInputValues;
    onValidate?: MapDataUpdateFormValidationValues;
} & React.CSSProperties>;
export default function MapDataUpdateForm(props: MapDataUpdateFormProps): React.ReactElement;
