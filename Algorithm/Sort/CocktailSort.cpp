#include <ctime>
#include <windows.h>

int cocktailSort(int *arr, const int& len) {
    int temp, i = -1,
        startI = -1, endI = len;
    clock_t startTime, endTime;

    startTime = clock();
    while(++startI<--endI) {
        while(++i<endI) {
            if(arr[i] > arr[i+1]) {
                temp = arr[i];
                arr[i] = arr[i+1];
                arr[i+1] = temp;
            }
            // Sleep(1);
        }
        while(--i>startI) {
            if(arr[i] < arr[i-1]) {
                temp = arr[i];
                arr[i] = arr[i-1];
                arr[i-1] = temp;
            }
            // Sleep(1);
        }
    }
    endTime = clock();

    return endTime-startTime;
}