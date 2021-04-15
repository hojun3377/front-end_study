#include <ctime>
#include <windows.h>

int selectionSort(int *arr, const int& len) {
    int temp, min, i, j;
    clock_t startTime, endTime;
    
    startTime = clock();
    for(i=0; i<len-1; i++) {
        min=i;
        for(j=i+1; j<len; j++) {
            if(arr[min] > arr[j]) min = j;
            // Sleep(1);
        }
        temp = arr[i];
        arr[i] = arr[min];
        arr[min] = temp;
    }
    endTime = clock();

    return endTime-startTime;
}