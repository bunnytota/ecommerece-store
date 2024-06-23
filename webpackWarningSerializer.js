module.exports = {
    test: (value) => value instanceof Error && value.name === 'Warning',
    serialize: (warning) => {
      return {
        name: warning.name,
        message: warning.message,
        stack: warning.stack
      };
    },
    deserialize: (obj) => {
      const warning = new Error(obj.message);
      warning.name = obj.name;
      warning.stack = obj.stack;
      return warning;
    }
  };
  