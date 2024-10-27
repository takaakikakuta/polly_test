import * as React from "react";
import { GridProps } from "@aws-amplify/ui-react";
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
export declare type ProjectDataNavigationCreateFormInputValues = {};
export declare type ProjectDataNavigationCreateFormValidationValues = {};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ProjectDataNavigationCreateFormOverridesProps = {
    ProjectDataNavigationCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
} & EscapeHatchProps;
export declare type ProjectDataNavigationCreateFormProps = React.PropsWithChildren<{
    overrides?: ProjectDataNavigationCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ProjectDataNavigationCreateFormInputValues) => ProjectDataNavigationCreateFormInputValues;
    onSuccess?: (fields: ProjectDataNavigationCreateFormInputValues) => void;
    onError?: (fields: ProjectDataNavigationCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ProjectDataNavigationCreateFormInputValues) => ProjectDataNavigationCreateFormInputValues;
    onValidate?: ProjectDataNavigationCreateFormValidationValues;
} & React.CSSProperties>;
export default function ProjectDataNavigationCreateForm(props: ProjectDataNavigationCreateFormProps): React.ReactElement;
