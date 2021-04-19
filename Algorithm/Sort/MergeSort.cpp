#include <ctime>
#include <windows.h>

void conquer(int *arr, const int& left, const int& right, const int& mid) {
    int *tempArr = new int[right-left+1],
        i, j, k, temp;
    
    for(i=left, j=mid+1, k=0; i <= mid && j <= right; k++)
        if(arr[i] > arr[j])  tempArr[k] = arr[j++];
        else tempArr[k] = arr[i++];

    for(temp = i>mid ? j : i; k<=right-left; k++, temp++) tempArr[k] = arr[temp];

    for(i=left, k=0; i<=right; i++, k++) arr[i] = tempArr[k];

    delete[] tempArr;
    // Sleep(1);
}

void divide(int *arr, const int& left, const int& right) {
    int mid;

    if(left < right) {
        mid = (left+right)/2;
        divide(arr, left, mid);
        divide(arr, mid+1, right);
        conquer(arr, left, right, mid);
    }
}

int mergeSort(int *arr, const int& len) {
    clock_t startTime, endTime;

    startTime = clock();
    divide(arr, 0, len-1);
    endTime = clock();

    return endTime-startTime;
}