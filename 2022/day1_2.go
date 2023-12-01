package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"sort"
	"strconv"
)

func main() {
	file, err := os.Open("day1.prod")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	current := 0
	var totals = []int{}
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		if scanner.Text() == "" {
			totals = append(totals, current)
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
	// add the final section
	totals = append(totals, current)

	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}
	sort.Ints(totals)
	highest := totals[len(totals)-3:]

	sum := 0
	for _, v := range highest {
		sum += v
	}
	fmt.Println(sum)
}
