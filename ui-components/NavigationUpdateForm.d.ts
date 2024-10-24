import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Navigation } from "./graphql/types";
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
export declare type NavigationUpdateFormInputValues = {
    text?: string;
};
export declare type NavigationUpdateFormValidationValues = {
    text?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type NavigationUpdateFormOverridesProps = {
    NavigationUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    text?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type NavigationUpdateFormProps = React.PropsWithChildren<{
    overrides?: NavigationUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    navigation?: Navigation;
    onSubmit?: (fields: NavigationUpdateFormInputValues) => NavigationUpdateFormInputValues;
    onSuccess?: (fields: NavigationUpdateFormInputValues) => void;
    onError?: (fields: NavigationUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: NavigationUpdateFormInputValues) => NavigationUpdateFormInputValues;
    onValidate?: NavigationUpdateFormValidationValues;
} & React.CSSProperties>;
export default function NavigationUpdateForm(props: NavigationUpdateFormProps): React.ReactElement;
