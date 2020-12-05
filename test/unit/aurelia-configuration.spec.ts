import { FrameworkConfiguration, Container } from "aurelia-framework";
import { createSpyObj } from "./helpers";
import { configure } from "resources/index";
import {
  PluginIconVisitor,
  IconVisitorInjectionKey
} from "resources/plugin-icon-visitor";
import { IconConfigurationVisitor } from "resources/icon-configuration-visitor";
import { library } from "@fortawesome/fontawesome-svg-core";

describe("aurelia setup", () => {
  let aurelia: jasmine.SpyObj<FrameworkConfiguration>;
  let container: jasmine.SpyObj<Container>;

  beforeEach(() => {
    aurelia = createSpyObj("config", FrameworkConfiguration.prototype);
    container = createSpyObj("container", Container.prototype);
    aurelia.container = container;
  });

  it("registers the custom element with its requirements", () => {
    configure(aurelia);

    expect(aurelia.globalResources).toHaveBeenCalledWith([
      "./font-awesome-icon"
    ]);
    expect(aurelia.globalResources.calls.count()).toEqual(1);
    expect(container.registerSingleton.calls.count()).toEqual(1);
    expect(container.registerSingleton.calls.argsFor(0)[0]).toBe(
      PluginIconVisitor
    );
    expect(container.registerSingleton.calls.argsFor(0)[1]).toBe(
      PluginIconVisitor
    );
  });

  [null, undefined, {}, { icons: [] }].forEach(iconOptions => {
    it("does not register icons or option options when either are missing", () => {
      const libraryAddSpy: jasmine.Spy = spyOn(library, "add");

      configure(aurelia, iconOptions);

      expect(libraryAddSpy.calls.count()).toEqual(0);
      expect(container.registerInstance.calls.count()).toEqual(0);
    });
  });

  it("register icons and icon options when both exists", () => {
    const libraryAddSpy: jasmine.Spy = spyOn(library, "add");
    const options = {
      icons: ["foo", "bar"],
      iconOptions: {}
    };

    configure(aurelia, options);

    expect(libraryAddSpy.calls.count()).toEqual(1);
    expect(libraryAddSpy).toHaveBeenCalledWith("foo", "bar");
    expect(container.registerInstance.calls.count()).toEqual(1);
    expect(container.registerInstance.calls.argsFor(0)[0]).toBe(
      IconVisitorInjectionKey
    );
    expect(container.registerInstance.calls.argsFor(0)[1]).toEqual(
      jasmine.any(IconConfigurationVisitor)
    );
  });
});
