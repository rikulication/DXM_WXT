import {description} from './content/dxm/injected/description.js';
import {replace_description} from './content/dxm/injected/replace.js';
export default defineUnlistedScript({
    main() {
        description();
        replace_description();
    },
});