import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type RoomDataCreateFormInputValues = {
    template?: string;
    templateName?: string;
    thumbnail?: string;
    model?: string;
    videos?: string[];
    CameraPointList?: string[];
    Navigations?: string;
};
export declare type RoomDataCreateFormValidationValues = {
    template?: ValidationFunction<string>;
    templateName?: ValidationFunction<string>;
    thumbnail?: ValidationFunction<string>;
    model?: ValidationFunction<string>;
    videos?: ValidationFunction<string>;
    CameraPointList?: ValidationFunction<string>;
    Navigations?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type RoomDataCreateFormOverridesProps = {
    RoomDataCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    template?: PrimitiveOverrideProps<SelectFieldProps>;
    templateName?: PrimitiveOverrideProps<TextFieldProps>;
    thumbnail?: PrimitiveOverrideProps<TextFieldProps>;
    model?: PrimitiveOverrideProps<TextFieldProps>;
    videos?: PrimitiveOverrideProps<TextFieldProps>;
    CameraPointList?: PrimitiveOverrideProps<TextFieldProps>;
    Navigations?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type RoomDataCreateFormProps = React.PropsWithChildren<{
    overrides?: RoomDataCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: RoomDataCreateFormInputValues) => RoomDataCreateFormInputValues;
    onSuccess?: (fields: RoomDataCreateFormInputValues) => void;
    onError?: (fields: RoomDataCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: RoomDataCreateFormInputValues) => RoomDataCreateFormInputValues;
    onValidate?: RoomDataCreateFormValidationValues;
} & React.CSSProperties>;
export default function RoomDataCreateForm(props: RoomDataCreateFormProps): React.ReactElement;
