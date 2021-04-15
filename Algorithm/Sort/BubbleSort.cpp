#include <ctime>
#include <windows.h>

int bubbleSort(int *arr, int len) {
    int temp, i, j;
    clock_t startTime, endTime;

    startTime = clock();
    for(i=len-1; i>0; i--) {
        for(j=0; j<i; j++) {
            if(arr[j] > arr[j+1]) {
                temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
            // Sleep(1);
        }
    }
    endTime = clock();

    return endTime-startTime; 
}