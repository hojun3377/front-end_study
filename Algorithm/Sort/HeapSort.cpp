#include <windows.h>
#include <ctime>

void heapify(int *arr, const int& len, const int& root) {
    int child, parent, temp;

    parent = root;
    while(parent < len/2) {
        child = 2*(parent+1);

        if(child==len || arr[child]<=arr[child-1]) child--;
        
        if(arr[parent] > arr[child]) break;
        
        temp = arr[parent];
        arr[parent] = arr[child];
        arr[child] = temp;

        parent = child; 
    }
    // Sleep(1);
}

int heapSort(int *arr, const int& len) {
    clock_t startTime, endTime;
    int i, p, child, temp;

    startTime = clock();
    for(i=len/2-1; i>-1; i--) heapify(arr, len, i);
    for(i=len-1; i>0; i--) {
        temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;
        
        heapify(arr, i, 0);
    }
    endTime = clock();

    return endTime-startTime;
}