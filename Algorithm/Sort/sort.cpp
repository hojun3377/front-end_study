#include <iostream>
#include <string>
#include "RandomArr.cpp"
#include "BubbleSort.cpp"
#include "CocktailSort.cpp"
#include "SelectionSort.cpp"
#include "InsertionSort.cpp"
#include "MergeSort.cpp"
#include "HeapSort.cpp"
#include "QuickSort.cpp"

int main() {
    
    RandomArr ra(10000);
    int time[7], i,
        *arr = ra.getArr(),
        len = ra.getLen();
    std::string sort[7] = {
        "bubble", "cocktail", "selection", "insertion",
        "merge", "heap", "quick"
    };

    // before array print
    std::cout << "before: ";
    // for(int i=0; i<len; i++) std::cout << arr[i] << ' ';
    std::cout << std::endl;

    // sort
    time[0] = bubbleSort(arr,len);
    std::cout << std::endl << sort[0] << ": ";
    // for(int i=0; i<len; i++) std::cout << arr[i] << ' ';
    std::cout << "\ntime: " << time[0] << std::endl;
    delete[] arr;

    arr = ra.getArr();
    time[1] = cocktailSort(arr,len);
    std::cout << std::endl << sort[1] << ": ";
    // for(int i=0; i<len; i++) std::cout << arr[i] << ' ';
    std::cout << "\ntime: " << time[1] << std::endl;
    delete[] arr;

    arr = ra.getArr();
    time[2] = selectionSort(arr,len);
    std::cout << std::endl << sort[2] << ": ";
    // for(int i=0; i<len; i++) std::cout << arr[i] << ' ';
    std::cout << "\ntime: " << time[2] << std::endl;
    delete[] arr;

    arr = ra.getArr();
    time[3] = insertionSort(arr,len);
    std::cout << std::endl << sort[3] << ": ";
    // for(int i=0; i<len; i++) std::cout << arr[i] << ' ';
    std::cout << "\ntime: " << time[3] << std::endl;
    delete[] arr;

    arr = ra.getArr();
    time[4] = mergeSort(arr,len);
    std::cout << std::endl << sort[4] << ": ";
    // for(int i=0; i<len; i++) std::cout << arr[i] << ' ';
    std::cout << "\ntime: " << time[4] << std::endl;
    delete[] arr;
    
    arr = ra.getArr();
    time[5] = heapSort(arr,len);
    std::cout << std::endl << sort[5] << ": ";
    // for(int i=0; i<len; i++) std::cout << arr[i] << ' ';
    std::cout << "\ntime: " << time[5] << std::endl;
    delete[] arr;

    arr = ra.getArr();
    time[6] = quickSort(arr,len);
    std::cout << std::endl << sort[6] << ": ";
    // for(int i=0; i<len; i++) std::cout << arr[i] << ' ';
    std::cout << "\ntime: " << time[6] << std::endl;
    delete[] arr;

    return 0;
}