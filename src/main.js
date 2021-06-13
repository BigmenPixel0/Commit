import "./setup.js";

import Gio from "gi://Gio";
import GLib from "gi://GLib";
import { programInvocationName } from "system";

import Application from "./application.js";

GLib.set_prgname("re.sonny.Commit");
GLib.set_application_name("Commit");

export default function main(argv, { version }) {
  const application = new Application({ version });

  if (__DEV__) {
    log("argv " + argv.join(" "));
    log(`programInvocationName: ${programInvocationName}`);
    log(`_: ${GLib.getenv("_")}`);
    log(`PWD: ${GLib.get_current_dir()}`);

    const restart = new Gio.SimpleAction({
      name: "restart",
      parameter_type: null,
    });
    restart.connect("activate", () => {
      application.quit();
      GLib.spawn_async(null, argv, null, GLib.SpawnFlags.DEFAULT, null);
    });
    application.add_action(restart);
    application.set_accels_for_action("app.restart", ["<Ctrl><Shift>Q"]);
  }

  return application.run(argv);
}
