export function contactsFilter() {
  return (collection, params) => collection.filter(item => item.tag === (
    params.filter === 'none' ? item.tag : params.filter
  ));
//   return function (collection, params) {
//     console.log({collection, params});
//     return collection.filter((item) => item.tag === (
//       params.filter === 'none' ? item.tag : params.filter
//     ))
//   }
}
