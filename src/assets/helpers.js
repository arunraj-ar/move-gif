export const throttle = (func, limit) => {
    let flag = true;
    return (e) => {
      if (flag) {
        func(e);
        flag = false;
        setTimeout(() => {
          flag = true;
        }, limit);
      }
    };
  };