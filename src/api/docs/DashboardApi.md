# DashboardApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getDailyDespesa**](#getdailydespesa) | **GET** /api/v1/dashboard/daily/despesa | |
|[**getDailyReceita**](#getdailyreceita) | **GET** /api/v1/dashboard/daily/receita | |
|[**getFinancialSummary**](#getfinancialsummary) | **GET** /api/v1/dashboard/financial-summary | |
|[**getMonthlyDespesa**](#getmonthlydespesa) | **GET** /api/v1/dashboard/monthly/despesa | |
|[**getMonthlyReceita**](#getmonthlyreceita) | **GET** /api/v1/dashboard/monthly/receita | |
|[**getTotalsByCategory**](#gettotalsbycategory) | **GET** /api/v1/dashboard/category | |

# **getDailyDespesa**
> Array<DayTotalDTO> getDailyDespesa()


### Example

```typescript
import {
    DashboardApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DashboardApi(configuration);

let year: number; // (default to undefined)
let month: number; // (default to undefined)

const { status, data } = await apiInstance.getDailyDespesa(
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

**Array<DayTotalDTO>**

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

# **getDailyReceita**
> Array<DayTotalDTO> getDailyReceita()


### Example

```typescript
import {
    DashboardApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DashboardApi(configuration);

let year: number; // (default to undefined)
let month: number; // (default to undefined)

const { status, data } = await apiInstance.getDailyReceita(
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

**Array<DayTotalDTO>**

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

# **getFinancialSummary**
> Array<MonthlyFinancialSummaryDTO> getFinancialSummary()


### Example

```typescript
import {
    DashboardApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DashboardApi(configuration);

let inicio: string; // (default to undefined)
let fim: string; // (default to undefined)

const { status, data } = await apiInstance.getFinancialSummary(
    inicio,
    fim
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **inicio** | [**string**] |  | defaults to undefined|
| **fim** | [**string**] |  | defaults to undefined|


### Return type

**Array<MonthlyFinancialSummaryDTO>**

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

# **getMonthlyDespesa**
> Array<MonthTotalDTO> getMonthlyDespesa()


### Example

```typescript
import {
    DashboardApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DashboardApi(configuration);

let initDate: string; // (default to undefined)
let endDate: string; // (default to undefined)

const { status, data } = await apiInstance.getMonthlyDespesa(
    initDate,
    endDate
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **initDate** | [**string**] |  | defaults to undefined|
| **endDate** | [**string**] |  | defaults to undefined|


### Return type

**Array<MonthTotalDTO>**

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

# **getMonthlyReceita**
> Array<MonthTotalDTO> getMonthlyReceita()


### Example

```typescript
import {
    DashboardApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DashboardApi(configuration);

let initDate: string; // (default to undefined)
let endDate: string; // (default to undefined)

const { status, data } = await apiInstance.getMonthlyReceita(
    initDate,
    endDate
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **initDate** | [**string**] |  | defaults to undefined|
| **endDate** | [**string**] |  | defaults to undefined|


### Return type

**Array<MonthTotalDTO>**

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

# **getTotalsByCategory**
> Array<CategoryTotalDTO> getTotalsByCategory()


### Example

```typescript
import {
    DashboardApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DashboardApi(configuration);

let initDate: string; // (default to undefined)
let endDate: string; // (default to undefined)

const { status, data } = await apiInstance.getTotalsByCategory(
    initDate,
    endDate
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **initDate** | [**string**] |  | defaults to undefined|
| **endDate** | [**string**] |  | defaults to undefined|


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

