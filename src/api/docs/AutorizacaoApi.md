# AutorizacaoApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**forgotPassword**](#forgotpassword) | **POST** /api/v1/auth/forgot-password | |
|[**resetPassword**](#resetpassword) | **POST** /api/v1/auth/reset-password/{token} | |
|[**usuarioLogin**](#usuariologin) | **POST** /api/v1/auth/login | |
|[**usuarioRegister**](#usuarioregister) | **POST** /api/v1/auth/register | |

# **forgotPassword**
> forgotPassword(forgotPasswordDTO)


### Example

```typescript
import {
    AutorizacaoApi,
    Configuration,
    ForgotPasswordDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new AutorizacaoApi(configuration);

let forgotPasswordDTO: ForgotPasswordDTO; //

const { status, data } = await apiInstance.forgotPassword(
    forgotPasswordDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **forgotPasswordDTO** | **ForgotPasswordDTO**|  | |


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **resetPassword**
> resetPassword(resetPasswordDTO)


### Example

```typescript
import {
    AutorizacaoApi,
    Configuration,
    ResetPasswordDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new AutorizacaoApi(configuration);

let token: string; // (default to undefined)
let resetPasswordDTO: ResetPasswordDTO; //

const { status, data } = await apiInstance.resetPassword(
    token,
    resetPasswordDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **resetPasswordDTO** | **ResetPasswordDTO**|  | |
| **token** | [**string**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **usuarioLogin**
> AuthorizationResponseDTO usuarioLogin(loginRequestDTO)

Login de usuário

### Example

```typescript
import {
    AutorizacaoApi,
    Configuration,
    LoginRequestDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new AutorizacaoApi(configuration);

let loginRequestDTO: LoginRequestDTO; //

const { status, data } = await apiInstance.usuarioLogin(
    loginRequestDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **loginRequestDTO** | **LoginRequestDTO**|  | |


### Return type

**AuthorizationResponseDTO**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **usuarioRegister**
> AuthorizationResponseDTO usuarioRegister(registerRequestDTO)

Cadastro de usuário

### Example

```typescript
import {
    AutorizacaoApi,
    Configuration,
    RegisterRequestDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new AutorizacaoApi(configuration);

let registerRequestDTO: RegisterRequestDTO; //

const { status, data } = await apiInstance.usuarioRegister(
    registerRequestDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **registerRequestDTO** | **RegisterRequestDTO**|  | |


### Return type

**AuthorizationResponseDTO**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Created |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

