# RangoJS killPort Method Documentation

The `killPort` method in RangoJS allows you to forcefully terminate a process running on a specific port. This can be useful when you need to free up a port that is being used by a process that is not responding or needs to be stopped.

## Method Signature

```ts
rango.killPort(port [, options])
```

- port (number): The port number of the process you want to terminate.
- options (object, optional): Additional options for the killPort method.

## Parameters

- port: The port number (e.g., 3000) of the process you want to terminate.
- options: An optional object containing additional configuration for the killPort method. The available options are:
  - signal (string, default: "SIGTERM"): The signal to send to the process for termination. This can be any valid signal supported by your operating system, such as "SIGTERM", "SIGINT", or "SIGKILL".
  - force (boolean, default: false): If set to true, the method will attempt to forcefully terminate the process using the provided signal. If false, it will first attempt a graceful termination.

## Example Usage

```ts
const rango = require('rango');

// Terminate a process running on port 3000
rango.killPort(3000);

// Terminate a process running on port 8080 with a custom signal
rango.killPort(8080, { signal: "SIGINT" });

// Forcefully terminate a process running on port 5000
rango.killPort(5000, { force: true });

```

### Note

- The `killPort` method forcefully terminates the process running on the specified port. Use this method with caution, as it may result in data loss or instability if used improperly.
- It's recommended to first attempt a graceful termination (**force: false**) before resorting to a forced termination (**force: true**).
- Different operating systems may have varying behaviors and support for different signals. Make sure to choose an appropriate signal based on your use case.

> **Important**: The usage and behavior of the `killPort` method may vary based on the specific version of RangoJS you are using. Always refer to the official documentation and version-specific resources for accurate information.
