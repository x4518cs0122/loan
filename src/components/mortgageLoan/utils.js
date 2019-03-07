export function formatAxiosOptions(arr) {
  return arr.map(item => {
    return {
      text: item.value,
      value: item.id+''
    };
  });
}
