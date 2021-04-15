#include <iostream>
#include <string>
#include "RandomArr.cpp"
#include "BubbleSort.cpp"
#include "CocktailSort.cpp"
#include "SelectionSort.cpp"
#include "InsertionSort.cpp"

int main() {
    RandomArr ra(10000);
    int time[4], i,
        *arr = ra.getArr(),
        len = ra.getLen();
    std::string sort[4] = {
        "bubble", "cocktail", "selection", "insertion"
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

    // after array print

    return 0;
}