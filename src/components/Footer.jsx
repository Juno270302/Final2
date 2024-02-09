import React from 'react'

const footer = () => {
  return (
    <footer class="rounded-lg shadow m-4 ">
      <div class="w-full mx-auto max-w-screen-xl p-4 flex items-center justify-between  absolute bottom-1 right-1 ">
        <span class="text-sm text-[#212140] sm:text-center dark:text-gray-400">
          © 2023{" "}
          <a href="http://localhost:3000" class="hover:underline">
            Movies
          </a>
          . All Rights Reserved.
        </span>
        <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-[#212140] dark:text-gray-400 sm:mt-0">
          <li>
            <a href="#" class="hover:underline me-4 md:me-6">
              About
            </a>
          </li>
          <li>
            <a href="#" class="hover:underline me-4 md:me-6">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" class="hover:underline me-4 md:me-6">
              Licensing
            </a>
          </li>
          <li>
            <a href="#" class="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default footer