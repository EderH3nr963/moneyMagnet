# DashboardControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getCategoryTotals**](#getcategorytotals) | **GET** /api/v1/dashboard/category | |
|[**getDashboardSummary**](#getdashboardsummary) | **GET** /api/v1/dashboard/summary | |
|[**getMonthlyTotals**](#getmonthlytotals) | **GET** /api/v1/dashboard/monthly | |

# **getCategoryTotals**
> Array<CategoryTotalDTO> getCategoryTotals()


### Example

```typescript
import {
    DashboardControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DashboardControllerApi(configuration);

let year: number; // (default to undefined)

const { status, data } = await apiInstance.getCategoryTotals(
    year
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **year** | [**number**] |  | defaults to undefined|


### Return type

**Array<CategoryTotalDTO>**

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

# **getDashboardSummary**
> DashboardSummaryDTO getDashboardSummary()


### Example

```typescript
import {
    DashboardControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DashboardControllerApi(configuration);

let year: number; // (default to undefined)
let month: number; // (default to undefined)

const { status, data } = await apiInstance.getDashboardSummary(
    year,
    month
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **year** | [**number**] |  | defaults to undefined|
| **month** | [**number**] |  | defaults to undefined|


### Return type

**DashboardSummaryDTO**

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

# **getMonthlyTotals**
> Array<MonthlyTotalDTO> getMonthlyTotals()


### Example

```typescript
import {
    DashboardControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DashboardControllerApi(configuration);

let year: number; // (default to undefined)

const { status, data } = await apiInstance.getMonthlyTotals(
    year
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **year** | [**number**] |  | defaults to undefined|


### Return type

**Array<MonthlyTotalDTO>**

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

