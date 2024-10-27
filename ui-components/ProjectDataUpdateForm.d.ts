import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { ProjectData } from "./graphql/types";
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
export declare type ProjectDataUpdateFormInputValues = {
    projectName?: string;
    templateId?: string;
};
export declare type ProjectDataUpdateFormValidationValues = {
    projectName?: ValidationFunction<string>;
    templateId?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ProjectDataUpdateFormOverridesProps = {
    ProjectDataUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    projectName?: PrimitiveOverrideProps<TextFieldProps>;
    templateId?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ProjectDataUpdateFormProps = React.PropsWithChildren<{
    overrides?: ProjectDataUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    projectData?: ProjectData;
    onSubmit?: (fields: ProjectDataUpdateFormInputValues) => ProjectDataUpdateFormInputValues;
    onSuccess?: (fields: ProjectDataUpdateFormInputValues) => void;
    onError?: (fields: ProjectDataUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ProjectDataUpdateFormInputValues) => ProjectDataUpdateFormInputValues;
    onValidate?: ProjectDataUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ProjectDataUpdateForm(props: ProjectDataUpdateFormProps): React.ReactElement;
