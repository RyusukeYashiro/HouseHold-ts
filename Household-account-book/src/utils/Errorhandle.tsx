export function isFireStoreError(err : unknown) : err is {code : string , message : string} {
    return typeof err === "object" && err !== null && ("code" || "message") in err
}