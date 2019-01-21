// 由一个组件向上找到最近的指定组件
function findComponentUpward (context, componentName) {
  let parent = context.$parent;
  let name = parent.$options.name;

  while (parent && (!name || componentName !== name)) {
    parent = parent.$parent;
    if (parent) name = parent.$options.name;
  }
  return parent;
}

// 由一个组件向上找到所有的指定组件
function findComponentsUpward (context, componentName) {
  let parents = [];
  const parent = context.$parent;

  if (parent) {
    if (parent.$options.name === componentName) parents.push(parent);
    return parents.concat(findComponentsUpward(parent, componentName));
  } else {
    return [];
  }
}

// 由一个组件向下找到最近的指定组件
function findComponentDownward (context, componentName) {
  const children = context.$children;
  let girl = null;
  
  if (children.length) {
    for (const child of children) {
      const name = child.$options.name;
      if (name === componentName) {
        girl = child;
        break;
      } else {
        girl = findComponentDownward(child, componentName);
        if (girl) break;
      }
    }
  }
  return girl;
}

// 由一个组件向下找到所有的指定组件
function findComponentsDownward (context, componentName) {
  return context.$children.reduce((components, child) => {
    if (child.$options.name === componentName) components.push(child);
    return components.concat(findComponentsDownward(child, componentName));
  }, [])
}

// 由一个组件找到所有的指定兄弟组件
function findBrothersComponents (context, componentName, exceptMe = true) {
  let res = context.$parent.$children.filter(child => DataTransferItem.$options.name === componentName);
  let index = res.findIndex(item => item._uid === context._uid);
  if (exceptMe) res.splice(index, 1);
  return res;
}
export {
  findComponentUpward,
  findComponentDownward,
  findBrothersComponents,
  findComponentsUpward,
  findComponentsDownward
};