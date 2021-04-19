#include <ctime>
#include <random>
#include <chrono>
#include <windows.h>

void quick(int *arr, const int& left, const int& right) {
    if(left >= right) return;

    int pivot, temp,
        leftPointer = left, 
        rightPointer = right-1;
    
    // std::mt19937_64 gen(std::chrono::high_resolution_clock::now().time_since_epoch().count());
    // std::uniform_int_distribution<int> dis(left, right);
    // pivot = dis(gen);
    // temp = arr[pivot];
    // arr[pivot] = arr[right];
    // arr[right] = temp;

    pivot = arr[right];
    do {
        while(arr[leftPointer] < pivot) leftPointer++;
        while(arr[rightPointer] >= pivot) rightPointer--;

        if(leftPointer > rightPointer) {
            temp = arr[leftPointer];
            arr[leftPointer] = arr[right];
            arr[right] = temp;
        }
        else {
            temp = arr[leftPointer];
            arr[leftPointer] = arr[rightPointer];
            arr[rightPointer] = temp;
        }
    } while(leftPointer < rightPointer);

    quick(arr, left, leftPointer-1);
    quick(arr, leftPointer+1, right);
    // Sleep(1);
}

int quickSort(int *arr, const int& len) {
    clock_t startTime, endTime;

    startTime = clock();
    quick(arr, 0, len-1);
    endTime = clock();

    return endTime-startTime;
}