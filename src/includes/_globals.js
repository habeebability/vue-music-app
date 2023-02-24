import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";

export default {
  install(app) {
    const baseComponent = import.meta.glob("../components/base/*.vue", {
      eager: true,
    });

    Object.entries(baseComponent).forEach(([path, module]) => {
      const componentName = upperFirst(
        camelCase(
          path
            .split("/")
            .pop()
            .replace(/\.\w+$/, "")
        )
      );
      //   console.log(path, componentName);

      //   export default
      app.component(`Base${componentName}`, module.default);
    });
  },
};
