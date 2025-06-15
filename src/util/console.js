export function logGroup(title, content) {
    console.groupCollapsed(title);
    console.log(content);
    console.groupEnd();
}