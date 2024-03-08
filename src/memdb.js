let items = [
    {
      "id": 0,
      "name": "Jack Jackson",
      "email": "jackj@abc.com",
      "password": "jackj"
    },
    {
      "name": "Katie Kates",
      "email": "katiek@abc.com",
      "password": "katiek",
      "id": 1
    },
    {
      "name": "Glen Glenns",
      "email": "gleng@abc.com",
      "password": "gleng",
      "id": 2
    }
  ]
  export function getAll(){
    return items;
}

export function get(id) {
  let result = null;
  for( let item of items){
    if(item.id === id){
      result = item;
    }
  }
  return result;
}

// deleteById get()
export function deleteById(id) {
  let arrayIndex = getArrayIndexForId(id);
  if( arrayIndex >= 0 && arrayIndex < items.length){
    items.splice(arrayIndex,1);
  }
}

// deleteById getNextId()
export function post(item) {
  let nextid = getNextId();
  item.id = nextid;
  items[items.length] = item;
}

// deleteById put()
export function put(id, item) {
  for( let i = 0; i < items.length; i++){
    if(items[i].id === id){
      items[i] = item;
      return;
    }
  }
}

// deleteById getArrayIndexForId()
function getArrayIndexForId(id){
  for( let i = 0; i < items.length; i++){
    if(items[i].id === id){
      return i;
    }
  }
  return -1;  
}

// deleteById getNextId()
function getNextId(){
  let maxid = 0;
  for( let item of items){
    maxid = (item.id > maxid)?item.id:maxid;
  }  
  return maxid + 1;
}

// Declare validateEmail()Method
export function validateEmail(email) {
  var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var result = regex.test(email);
  if(result === true){
    return true;
  }
}

export default items;



