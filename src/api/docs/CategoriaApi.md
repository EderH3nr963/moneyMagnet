# CategoriaApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createCategory**](#createcategory) | **POST** /categories | |
|[**deleteCategory**](#deletecategory) | **DELETE** /categories/{categoryId} | |
|[**getAllCategories**](#getallcategories) | **GET** /categories | |
|[**getCategoryById**](#getcategorybyid) | **GET** /categories/{categoryId} | |
|[**updateCategory**](#updatecategory) | **PUT** /categories/{categoryId} | |
|[**updateCategoryName**](#updatecategoryname) | **PATCH** /categories/{categoryId}/name | |
|[**updateCategoryType**](#updatecategorytype) | **PATCH** /categories/{categoryId}/type | |

# **createCategory**
> CategoryResponseDTO createCategory(createCategoryDTO)


### Example

```typescript
import {
    CategoriaApi,
    Configuration,
    CreateCategoryDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new CategoriaApi(configuration);

let createCategoryDTO: CreateCategoryDTO; //

const { status, data } = await apiInstance.createCategory(
    createCategoryDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createCategoryDTO** | **CreateCategoryDTO**|  | |


### Return type

**CategoryResponseDTO**

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

# **deleteCategory**
> deleteCategory()


### Example

```typescript
import {
    CategoriaApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CategoriaApi(configuration);

let categoryId: string; // (default to undefined)

const { status, data } = await apiInstance.deleteCategory(
    categoryId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **categoryId** | [**string**] |  | defaults to undefined|


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

# **getAllCategories**
> Array<CategoryResponseDTO> getAllCategories()


### Example

```typescript
import {
    CategoriaApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CategoriaApi(configuration);

const { status, data } = await apiInstance.getAllCategories();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<CategoryResponseDTO>**

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

# **getCategoryById**
> CategoryResponseDTO getCategoryById()


### Example

```typescript
import {
    CategoriaApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CategoriaApi(configuration);

let categoryId: string; // (default to undefined)

const { status, data } = await apiInstance.getCategoryById(
    categoryId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **categoryId** | [**string**] |  | defaults to undefined|


### Return type

**CategoryResponseDTO**

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

# **updateCategory**
> CategoryResponseDTO updateCategory(updateCategoryDTO)


### Example

```typescript
import {
    CategoriaApi,
    Configuration,
    UpdateCategoryDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new CategoriaApi(configuration);

let categoryId: string; // (default to undefined)
let updateCategoryDTO: UpdateCategoryDTO; //

const { status, data } = await apiInstance.updateCategory(
    categoryId,
    updateCategoryDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateCategoryDTO** | **UpdateCategoryDTO**|  | |
| **categoryId** | [**string**] |  | defaults to undefined|


### Return type

**CategoryResponseDTO**

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

# **updateCategoryName**
> CategoryResponseDTO updateCategoryName(updateNameCategoryDTO)


### Example

```typescript
import {
    CategoriaApi,
    Configuration,
    UpdateNameCategoryDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new CategoriaApi(configuration);

let categoryId: string; // (default to undefined)
let updateNameCategoryDTO: UpdateNameCategoryDTO; //

const { status, data } = await apiInstance.updateCategoryName(
    categoryId,
    updateNameCategoryDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateNameCategoryDTO** | **UpdateNameCategoryDTO**|  | |
| **categoryId** | [**string**] |  | defaults to undefined|


### Return type

**CategoryResponseDTO**

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

# **updateCategoryType**
> CategoryResponseDTO updateCategoryType(updateTypeCategoryDTO)


### Example

```typescript
import {
    CategoriaApi,
    Configuration,
    UpdateTypeCategoryDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new CategoriaApi(configuration);

let categoryId: string; // (default to undefined)
let updateTypeCategoryDTO: UpdateTypeCategoryDTO; //

const { status, data } = await apiInstance.updateCategoryType(
    categoryId,
    updateTypeCategoryDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateTypeCategoryDTO** | **UpdateTypeCategoryDTO**|  | |
| **categoryId** | [**string**] |  | defaults to undefined|


### Return type

**CategoryResponseDTO**

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

