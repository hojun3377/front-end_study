#include <ctime>
#include <windows.h>

int insertionSort(int *arr, const int& len) {
    int temp, i, j;
    clock_t startTime, endTime;
    
    startTime = clock();
    for(i=1; i<len; i++) {
        temp = arr[i];
        for(j=i-1; j>-1 && arr[j]>temp; j--) arr[j+1] = arr[j];
        arr[j+1] = temp;
    }
    endTime = clock();

    return endTime-startTime;
}