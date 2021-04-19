#include <random>
#include <chrono>

class RandomArr {
private:
    /* data */
    int len;
    int *arr;
public:
    RandomArr();
    RandomArr(const int& len);
    ~RandomArr();
    int* getArr();
    int getLen();
};

RandomArr::RandomArr() {
    this->len = 1;
    this->arr = new int[1];

    arr[0] = 0;
}
RandomArr::RandomArr(const int& len) {
    this->len = len;
    this->arr = new int[len];

    std::mt19937_64 gen(std::chrono::high_resolution_clock::now().time_since_epoch().count());
    std::uniform_int_distribution<int> dis(0, len-1);
    for(int i=0; i<len; i++) arr[i] = dis(gen);
}
RandomArr::~RandomArr() {
    delete [] arr;
}
int* RandomArr::getArr() {
    int i, *copy = new int[this->len];

    for(i=0; i<this->len; i++) copy[i] = arr[i];

    return copy;
}
int RandomArr::getLen() {
    return this->len;
}