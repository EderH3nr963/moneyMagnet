# TransacaoApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**_delete**](#_delete) | **DELETE** /api/v1/transaction/{transactionId} | |
|[**create**](#create) | **POST** /api/v1/transaction | |
|[**getAllPageSortingByDate**](#getallpagesortingbydate) | **GET** /api/v1/transaction | |
|[**getById**](#getbyid) | **GET** /api/v1/transaction/{transactionId} | |
|[**importXlsx**](#importxlsx) | **POST** /api/v1/transaction/import/xlsx | |
|[**updateAmount**](#updateamount) | **PATCH** /api/v1/transaction/{transactionId}/amount | |
|[**updateDate**](#updatedate) | **PATCH** /api/v1/transaction/{transactionId}/date | |
|[**updateDescription**](#updatedescription) | **PATCH** /api/v1/transaction/{transactionId}/description | |
|[**updateTransaction**](#updatetransaction) | **PUT** /api/v1/transaction/{transactionId} | |

# **_delete**
> _delete()


### Example

```typescript
import {
    TransacaoApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TransacaoApi(configuration);

let transactionId: string; // (default to undefined)

const { status, data } = await apiInstance._delete(
    transactionId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **transactionId** | [**string**] |  | defaults to undefined|


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

# **create**
> TransactionResponseDTO create(createTransactionDTO)


### Example

```typescript
import {
    TransacaoApi,
    Configuration,
    CreateTransactionDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new TransacaoApi(configuration);

let createTransactionDTO: CreateTransactionDTO; //

const { status, data } = await apiInstance.create(
    createTransactionDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createTransactionDTO** | **CreateTransactionDTO**|  | |


### Return type

**TransactionResponseDTO**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Created |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getAllPageSortingByDate**
> PageTransactionResponseDTO getAllPageSortingByDate()


### Example

```typescript
import {
    TransacaoApi,
    Configuration,
    Pageable
} from './api';

const configuration = new Configuration();
const apiInstance = new TransacaoApi(configuration);

let pageable: Pageable; // (default to undefined)

const { status, data } = await apiInstance.getAllPageSortingByDate(
    pageable
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **pageable** | **Pageable** |  | defaults to undefined|


### Return type

**PageTransactionResponseDTO**

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

# **getById**
> TransactionResponseDTO getById()


### Example

```typescript
import {
    TransacaoApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TransacaoApi(configuration);

let transactionId: string; // (default to undefined)

const { status, data } = await apiInstance.getById(
    transactionId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **transactionId** | [**string**] |  | defaults to undefined|


### Return type

**TransactionResponseDTO**

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

# **importXlsx**
> TransactionImportResponseDTO importXlsx()


### Example

```typescript
import {
    TransacaoApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TransacaoApi(configuration);

let file: File; // (default to undefined)

const { status, data } = await apiInstance.importXlsx(
    file
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **file** | [**File**] |  | defaults to undefined|


### Return type

**TransactionImportResponseDTO**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Created |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateAmount**
> TransactionResponseDTO updateAmount(updateAmountTransactionDTO)


### Example

```typescript
import {
    TransacaoApi,
    Configuration,
    UpdateAmountTransactionDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new TransacaoApi(configuration);

let transactionId: string; // (default to undefined)
let updateAmountTransactionDTO: UpdateAmountTransactionDTO; //

const { status, data } = await apiInstance.updateAmount(
    transactionId,
    updateAmountTransactionDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateAmountTransactionDTO** | **UpdateAmountTransactionDTO**|  | |
| **transactionId** | [**string**] |  | defaults to undefined|


### Return type

**TransactionResponseDTO**

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

# **updateDate**
> TransactionResponseDTO updateDate(updateDateTransactionDTO)


### Example

```typescript
import {
    TransacaoApi,
    Configuration,
    UpdateDateTransactionDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new TransacaoApi(configuration);

let transactionId: string; // (default to undefined)
let updateDateTransactionDTO: UpdateDateTransactionDTO; //

const { status, data } = await apiInstance.updateDate(
    transactionId,
    updateDateTransactionDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateDateTransactionDTO** | **UpdateDateTransactionDTO**|  | |
| **transactionId** | [**string**] |  | defaults to undefined|


### Return type

**TransactionResponseDTO**

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

# **updateDescription**
> TransactionResponseDTO updateDescription(updateDescriptionTransactionDTO)


### Example

```typescript
import {
    TransacaoApi,
    Configuration,
    UpdateDescriptionTransactionDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new TransacaoApi(configuration);

let transactionId: string; // (default to undefined)
let updateDescriptionTransactionDTO: UpdateDescriptionTransactionDTO; //

const { status, data } = await apiInstance.updateDescription(
    transactionId,
    updateDescriptionTransactionDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateDescriptionTransactionDTO** | **UpdateDescriptionTransactionDTO**|  | |
| **transactionId** | [**string**] |  | defaults to undefined|


### Return type

**TransactionResponseDTO**

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

# **updateTransaction**
> TransactionResponseDTO updateTransaction(updateTransactionDTO)


### Example

```typescript
import {
    TransacaoApi,
    Configuration,
    UpdateTransactionDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new TransacaoApi(configuration);

let transactionId: string; // (default to undefined)
let updateTransactionDTO: UpdateTransactionDTO; //

const { status, data } = await apiInstance.updateTransaction(
    transactionId,
    updateTransactionDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateTransactionDTO** | **UpdateTransactionDTO**|  | |
| **transactionId** | [**string**] |  | defaults to undefined|


### Return type

**TransactionResponseDTO**

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

