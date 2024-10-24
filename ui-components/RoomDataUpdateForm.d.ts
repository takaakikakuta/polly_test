import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { RoomData } from "./graphql/types";
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
export declare type RoomDataUpdateFormInputValues = {
    type?: string;
    template?: string;
    templateName?: string;
    thumbnail?: string;
    videos?: string[];
};
export declare type RoomDataUpdateFormValidationValues = {
    type?: ValidationFunction<string>;
    template?: ValidationFunction<string>;
    templateName?: ValidationFunction<string>;
    thumbnail?: ValidationFunction<string>;
    videos?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type RoomDataUpdateFormOverridesProps = {
    RoomDataUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    type?: PrimitiveOverrideProps<SelectFieldProps>;
    template?: PrimitiveOverrideProps<TextFieldProps>;
    templateName?: PrimitiveOverrideProps<TextFieldProps>;
    thumbnail?: PrimitiveOverrideProps<TextFieldProps>;
    videos?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type RoomDataUpdateFormProps = React.PropsWithChildren<{
    overrides?: RoomDataUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    roomData?: RoomData;
    onSubmit?: (fields: RoomDataUpdateFormInputValues) => RoomDataUpdateFormInputValues;
    onSuccess?: (fields: RoomDataUpdateFormInputValues) => void;
    onError?: (fields: RoomDataUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: RoomDataUpdateFormInputValues) => RoomDataUpdateFormInputValues;
    onValidate?: RoomDataUpdateFormValidationValues;
} & React.CSSProperties>;
export default function RoomDataUpdateForm(props: RoomDataUpdateFormProps): React.ReactElement;
