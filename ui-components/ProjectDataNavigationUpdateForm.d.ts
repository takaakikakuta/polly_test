import * as React from "react";
import { GridProps } from "@aws-amplify/ui-react";
import { ProjectDataNavigation } from "./graphql/types";
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
export declare type ProjectDataNavigationUpdateFormInputValues = {};
export declare type ProjectDataNavigationUpdateFormValidationValues = {};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ProjectDataNavigationUpdateFormOverridesProps = {
    ProjectDataNavigationUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
} & EscapeHatchProps;
export declare type ProjectDataNavigationUpdateFormProps = React.PropsWithChildren<{
    overrides?: ProjectDataNavigationUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    projectDataNavigation?: ProjectDataNavigation;
    onSubmit?: (fields: ProjectDataNavigationUpdateFormInputValues) => ProjectDataNavigationUpdateFormInputValues;
    onSuccess?: (fields: ProjectDataNavigationUpdateFormInputValues) => void;
    onError?: (fields: ProjectDataNavigationUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ProjectDataNavigationUpdateFormInputValues) => ProjectDataNavigationUpdateFormInputValues;
    onValidate?: ProjectDataNavigationUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ProjectDataNavigationUpdateForm(props: ProjectDataNavigationUpdateFormProps): React.ReactElement;
