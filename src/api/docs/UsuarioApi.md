# UsuarioApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**delete1**](#delete1) | **DELETE** /api/v1/profile | |
|[**getById1**](#getbyid1) | **GET** /api/v1/profile/me | |
|[**updateEmail**](#updateemail) | **PATCH** /api/v1/profile/email | |
|[**updatePassword**](#updatepassword) | **PATCH** /api/v1/profile/password | |
|[**updateUsername**](#updateusername) | **PATCH** /api/v1/profile/username | |
|[**updateUsernameAndEmail**](#updateusernameandemail) | **PATCH** /api/v1/profile/username/and/email | |

# **delete1**
> delete1()


### Example

```typescript
import {
    UsuarioApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsuarioApi(configuration);

const { status, data } = await apiInstance.delete1();
```

### Parameters
This endpoint does not have any parameters.


### Return type

void (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**204** | No Content |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getById1**
> UsuarioResponseDTO getById1()


### Example

```typescript
import {
    UsuarioApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsuarioApi(configuration);

const { status, data } = await apiInstance.getById1();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**UsuarioResponseDTO**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateEmail**
> UsuarioResponseDTO updateEmail(updateEmailDTO)


### Example

```typescript
import {
    UsuarioApi,
    Configuration,
    UpdateEmailDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new UsuarioApi(configuration);

let updateEmailDTO: UpdateEmailDTO; //

const { status, data } = await apiInstance.updateEmail(
    updateEmailDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateEmailDTO** | **UpdateEmailDTO**|  | |


### Return type

**UsuarioResponseDTO**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updatePassword**
> updatePassword(updatePasswordDTO)


### Example

```typescript
import {
    UsuarioApi,
    Configuration,
    UpdatePasswordDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new UsuarioApi(configuration);

let updatePasswordDTO: UpdatePasswordDTO; //

const { status, data } = await apiInstance.updatePassword(
    updatePasswordDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updatePasswordDTO** | **UpdatePasswordDTO**|  | |


### Return type

void (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateUsername**
> UsuarioResponseDTO updateUsername(updateUsernameDTO)


### Example

```typescript
import {
    UsuarioApi,
    Configuration,
    UpdateUsernameDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new UsuarioApi(configuration);

let updateUsernameDTO: UpdateUsernameDTO; //

const { status, data } = await apiInstance.updateUsername(
    updateUsernameDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateUsernameDTO** | **UpdateUsernameDTO**|  | |


### Return type

**UsuarioResponseDTO**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateUsernameAndEmail**
> UsuarioResponseDTO updateUsernameAndEmail(updateEmailAndUsernameDTO)


### Example

```typescript
import {
    UsuarioApi,
    Configuration,
    UpdateEmailAndUsernameDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new UsuarioApi(configuration);

let updateEmailAndUsernameDTO: UpdateEmailAndUsernameDTO; //

const { status, data } = await apiInstance.updateUsernameAndEmail(
    updateEmailAndUsernameDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateEmailAndUsernameDTO** | **UpdateEmailAndUsernameDTO**|  | |


### Return type

**UsuarioResponseDTO**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

