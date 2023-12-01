package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
)

func main() {
	file, err := os.Open("day1.prod")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	current := 0
	max := 0
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		if scanner.Text() == "" {
			if current > max {
				max = current
			}
			current = 0
		} else {
			new, err := strconv.Atoi(scanner.Text())
			if err != nil {
				log.Fatal(err)
				break
			}
			current += new
		}
	}
	// one last operation now that we've hit the last line
	if current > max {
		max = current
	}

	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}
	fmt.Println(max)
}
