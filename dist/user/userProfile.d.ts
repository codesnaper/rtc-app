import { LitElement } from 'lit';
import { User } from '../model';
export declare class UserProfile extends LitElement {
    user: User | undefined;
    edit: boolean;
    editToggle(): void;
    createRenderRoot(): this;
    connectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
}
//# sourceMappingURL=userProfile.d.ts.map