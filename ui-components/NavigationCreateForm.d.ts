import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type NavigationCreateFormInputValues = {
    text?: string;
};
export declare type NavigationCreateFormValidationValues = {
    text?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type NavigationCreateFormOverridesProps = {
    NavigationCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    text?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type NavigationCreateFormProps = React.PropsWithChildren<{
    overrides?: NavigationCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: NavigationCreateFormInputValues) => NavigationCreateFormInputValues;
    onSuccess?: (fields: NavigationCreateFormInputValues) => void;
    onError?: (fields: NavigationCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: NavigationCreateFormInputValues) => NavigationCreateFormInputValues;
    onValidate?: NavigationCreateFormValidationValues;
} & React.CSSProperties>;
export default function NavigationCreateForm(props: NavigationCreateFormProps): React.ReactElement;
