
#include <stdio.h>

int main(){
    int b = 10;
    for (int i = 0; i < b; i++){
        printf("%p\n", &i);
    }

        return 0;
}