# Notes

## Run

**Dev**: `deno run --watch --unstable --allow-net server.ts`

## Errors when running

**Error**:
```
error: TS2345 [ERROR]: Argument of type 'string | URL' is not assignable to parameter of type 'string'.
  Type 'URL' is not assignable to type 'string'.
  return new URL(url).pathname
                 ~~~
    at https://deno.land/std@0.58.0/path/win32.ts:917:18

TS2345 [ERROR]: Argument of type 'string | URL' is not assignable to parameter of type 'string'.
  Type 'URL' is not assignable to type 'string'.
  return new URL(url).pathname;
                 ~~~
    at https://deno.land/std@0.58.0/path/posix.ts:438:18

Found 2 errors.
```

**Solution**: The version of std that was cached on my machine was incompatible with the current version of Oak. I needed up update the cache with:

```
deno cache --reload server.ts 
```
